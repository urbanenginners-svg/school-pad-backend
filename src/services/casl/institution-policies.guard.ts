import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { PolicyHandler } from "./casl-policies.decorator";
import { AppAbility } from "./types";
import { InstitutionAbilityFactory } from "./institution-ability.factory";
import { IS_PUBLIC_KEY } from "src/utils/decorators/public-key.decorator";

export const CHECK_INSTITUTION_POLICIES_KEY = "check_institution_policy";

@Injectable()
export class InstitutionPoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private institutionAbilityFactory: InstitutionAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_INSTITUTION_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    // If no policy handlers are defined, allow access
    if (policyHandlers.length === 0) {
      return true;
    }

    const { institutionUser } = request;

    // If institution user is not authenticated but policies are required, deny access
    if (!institutionUser) {
      return false;
    }

    // Check if user is active
    if (!institutionUser.isActive) {
      return false;
    }

    const ability = await this.institutionAbilityFactory.createForInstitutionUser(institutionUser);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === "function") {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
