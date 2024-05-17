export type Message = {
  type: string;
};

export type CallRequest = {
  type: "client_call";
  arguments: [any];
  function: string;
};

export function isCallRequest(obj: Message): obj is CallRequest {
  const callRequest = obj as CallRequest;
  return callRequest.type === 'client_call'
    && Array.isArray(callRequest.arguments)
    && typeof callRequest.function === 'string';
}

export async function callClientFunction(name: string, ...args: any): Promise<any> {
  return await chrome.runtime.sendMessage({
    type: "client_call",
    function: name,
    arguments: args,
  });
}
