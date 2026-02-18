import { SetMetadata } from "@nestjs/common";
import { PermissionEnum } from "src/utils/enums/permission.enum";
import { AppAbility } from "./types";

export const CHECK_INSTITUTION_POLICY = "check_institution_policy";

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

export type PolicyHandler = IPolicyHandler | ((ability: AppAbility) => boolean);

export const CheckInstitutionActionPolicy = (
  action: PermissionEnum,
  subject: string,
) =>
  SetMetadata(CHECK_INSTITUTION_POLICY, [
    (ability: AppAbility) => ability.can(action, subject),
  ]);
