import { badgeTypeEnum } from "../../enums/badgeTypeEnum";

export type IBadge = {
  name: string;
  description: string;
  icon: string;
  type: keyof typeof badgeTypeEnum;
  requiredCount: number;
  countCriteria: string;
};
