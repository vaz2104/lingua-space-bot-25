const AuthService = require("../services/AuthService");
const TaskService = require("../services/TaskService");
const TelegramUserService = require("../services/TelegramUserService");

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
        console.log(task);
        console.log(task.meta[0].status);

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
}

module.exports = new PanelCallbacks();
