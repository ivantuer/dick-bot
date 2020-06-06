import { TelegrafContext } from "telegraf/typings/context";

import { getRandomSize } from "../helpers/getRandomSize";
import UserModel from "../db/schemas/user";
import { messages } from "../helpers/messages";

type IUserData = {
  userId: string;
  chatId: string;
};

type ICreateUserData = {
  updatedAt: Date;
  size: number;
  userId: string;
  chatId: string;
  _id?: string;
  name?: string;
};

class UserController {
  static async roll(ctx: TelegrafContext) {
    const userData: IUserData = {
      userId: `${ctx!.message!.from!.id}`,
      chatId: `${ctx!.message!.chat!.id}`,
    };

    const user: ICreateUserData | null = await UserModel.findOne(userData);
    const randomSize: number = getRandomSize();

    if (!user) {
      const createdUser: ICreateUserData = await UserModel.create({
        ...userData,
        size: randomSize,
      });

      ctx.telegram.sendMessage(
        userData.chatId,
        messages.ROLL_INIT({
          userName: ctx!.message!.from!.username!,
          size: createdUser.size,
        })
      );
      return;
    }
    if (new Date(user.updatedAt).getTime() > new Date().setHours(0, 0, 0, 0)) {
      ctx.telegram.sendMessage(userData.chatId, messages.ROLL_ALREADY());
      return;
    }

    const newDickUser: ICreateUserData | null = await UserModel.findOneAndUpdate(
      userData,
      {
        ...userData,
        size: user.size + randomSize,
      }
    );

    ctx.telegram.sendMessage(
      userData.chatId,
      messages.ROLL({ oldSize: user.size, size: randomSize })
    );
    return;
  }

  static async me(ctx: TelegrafContext) {
    const userData: IUserData = {
      userId: `${ctx!.message!.from!.id}`,
      chatId: `${ctx!.message!.chat!.id}`,
    };

    const user: ICreateUserData | null = await UserModel.findOne(userData);

    if (!user) {
      ctx.telegram.sendMessage(userData.chatId, messages.REGISTER());
      return;
    }
    ctx.telegram.sendMessage(
      userData.chatId,
      messages.ME({ size: user!.size })
    );
    return;
  }

  static async top(ctx: TelegrafContext) {
    const users: Array<ICreateUserData> | [] = await UserModel.find({
      chatId: `${ctx!.message!.chat!.id}`,
    }).sort({ size: -1 });

    const members = await Promise.all(
      users.map((user) =>
        ctx.telegram.getChatMember(+user.chatId, +user.userId)
      )
    );
    members.map((member, i) => {
      users[i].name = member.user.first_name;
    });

    ctx.telegram.sendMessage(ctx!.message!.chat!.id, messages.TOP({ users }), {
      reply_to_message_id: ctx!.message!.message_id,
    });

    return;
  }
}

export default UserController;
