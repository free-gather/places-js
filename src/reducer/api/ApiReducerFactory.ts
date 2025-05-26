import type { DefaultApiAction } from "./DefaultApiAction.ts";
import { BaseGetAction } from "./BaseGetAction.ts";
import { BaseReducer } from "../BaseReducer.ts";
import { ExternalReducerAction } from "./ExternalReducerAction.ts";

export type DispatcherItem = {
  updateFunction: (a: any) => any;
  componentStore: string;
  field?: string;
};

export type ApiReducerConfig = {
  queryUrl: (a: any) => string;
  defaultFunctionConfig: DefaultApiAction;
};

export function generateGetApiReducer(config: ApiReducerConfig) {
  const getAction = new BaseGetAction(
    config.queryUrl,
    config.defaultFunctionConfig,
  );

  return new BaseReducer(getAction);
}

export function generateApiReducerWithExternalClient(
  retrieveData: (a: any, b: DefaultApiAction) => Promise<any>,
  defaultResponse: DefaultApiAction,
) {
  const action = new ExternalReducerAction(retrieveData, defaultResponse);
  return new BaseReducer(action);
}
