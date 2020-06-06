type IRollInit = {
  userName: string;
  size: number;
};

type IRoll = {
  oldSize: number;
  size: number;
};

type IMe = {
  size: number;
};

type ITop = {
  users: Array<any>;
};

export const messages = {
  ROLL_INIT: ({ userName, size }: IRollInit): string => {
    return `Вітаю, ${userName}!
Тепер ти в грі!
Твій cum-пулемет при народженні був: ${size}cм`;
  },
  ROLL: ({ oldSize, size }: IRoll): string => {
    return `Твоя сарделька ${
      size > 0 ? `збільшилась на ${size}см` : "лишилась такою самою :("
    }.
Вона теперь: ${oldSize + size}см;`;
  },
  ROLL_ALREADY: (): string => {
    return `Твій михайло-молодший сьогодні вже качався!`;
  },
  REGISTER: (): string => {
    return `Зареєструйся в грі!`;
  },
  ME: ({ size }: IMe): string => {
    return `Твій шампур у бойовому положенні aж ${size} см`;
  },
  TOP: ({ users }: ITop): string => {
    let responseStr: string = "";
    users.forEach((user, i) => {
      responseStr = responseStr + `${i + 1}. ${user.name}: ${user?.size}cм\n`;
    });
    return responseStr;
  },
};
