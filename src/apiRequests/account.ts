import http from "@/lib/http";
import { AccountResType } from "@/schema-validations/account.schema";

const accountApiRequest = {
  me: (sessionToken: string) =>
    http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  meClient: () => http.get<AccountResType>("/account/me"),
};

export default accountApiRequest;
