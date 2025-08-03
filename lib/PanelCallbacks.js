const AuthService = require("../services/AuthService");
const TaskService = require("../services/TaskService");
const TelegramUserService = require("../services/TelegramUserService");
const { MATHERIAL_TYPE } = require("./taskTypes");

const loadMatherialDetails = require("./loadMatherialDetails");
const messageByMatherialType = require("./messageByMatherialType");

class PanelCallbacks {
  async generateAuthData(bot, userObject) {
    const telegramUser = await TelegramUserService.telegramId(userObject.id);

    if (!telegramUser) {
      await bot.sendMessage(userObject.id, "Помилка авторизації", {
        parse_mode: "HTML",
      });
      return;
    }

    const authData = await AuthService.createKey({
      telegramUserId: telegramUser._id,
    });

    const message = `Ваші дані для одноразового входу:\n<b>Логін:</b> ${userObject.username}\n<b>Пароль:</b> ${authData.key}`;
    await bot.sendMessage(userObject.id, message, {
      parse_mode: "HTML",
    });
  }

  async assignTask(bot, userObject, options) {
    const query = {
      botId: options?.botId,
      students: [options?.userId],
      taskId: options?.taskId,
      deadline: "",
      type: "single",
    };

    const assignedTasks = await TaskService.TaskRelationGetMany({
      botId: options?.botId,
      students: options?.userId,
      taskId: options?.taskId,
      type: "single",
    });

    let isActiveTask = false;

    if (assignedTasks.length) {
      assignedTasks.forEach((task) => {
        if (task.meta[0].status !== "finished") {
          isActiveTask = true;
        }
      });
    }

    if (!isActiveTask) {
      const newTaskRelation = await TaskService.TaskRelationCreate(query);

      if (!newTaskRelation?._id) {
        await bot.sendMessage(userObject.id, "‼️ Вибачте, сталася помилка", {
          parse_mode: "HTML",
        });
        return;
      }

      await bot.sendMessage(
        userObject.id,
        "✅ Вам призначено нове завдання! 📚 Переходьте в панель та приступайте до виконання!",
        {
          parse_mode: "HTML",
        }
      );
    } else {
      await bot.sendMessage(
        userObject.id,
        "⚠️ Дане завдання вже було призначене раніше. 📚 Переходьте в панель та приступайте до виконання!",
        {
          parse_mode: "HTML",
        }
      );
      return;
    }
  }

  async postTask(bot, groupID, options, botID) {
    try {
      const { taskId, taskType } = options;

      const task = await TaskService.TaskGetSingle(taskId);
      const telegramData = await bot.getMe();

      const taskTypeLabel = MATHERIAL_TYPE[task?.matherialType]?.label;

      const LINK_URL = telegramData?.username
        ? `https://t.me/${telegramData?.username}?start=startTask-${botID}-${taskId}`
        : "";
      const LINK_TITLE = "🤖 Перейти в бот";
      const BOT_LINK = `<a href="${LINK_URL}">${LINK_TITLE}</a>`;

      const taskMatherial = await loadMatherialDetails(
        task?.matherialType,
        task?.selectedObject || task?.selectedItems[0]
      );

      const filteredData = messageByMatherialType(
        taskMatherial,
        task?.matherialType
      );

      const title =
        task?.matherialType === "text"
          ? `<b>Текст: «${taskMatherial.title}»</b>`
          : `<b>${taskTypeLabel} на тему «${taskMatherial.title}»</b>`;
      const { thumbnail, body, footerText } = filteredData;
      console.log(filteredData);
      console.log(groupID);

      const message =
        title + "\n\n" + body + "\n\n" + footerText + "\n\n" + BOT_LINK + "\n.";

      let post = null;
      if (thumbnail) {
        post = await bot.sendPhoto(groupID, thumbnail, {
          caption: message,
          parse_mode: "HTML",
        });
      } else {
        post = await bot.sendMessage(groupID, message, {
          parse_mode: "HTML",
        });
      }

      return post;
    } catch (error) {
      console.log(error);
      return { status: false, error };
    }
  }
}

module.exports = new PanelCallbacks();
