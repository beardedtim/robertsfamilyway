export default (
  log: (...args: any[]) => void,
  msg: string,
  fn: (...args: any[]) => Promise<any>
) => async (...fnArgs: any) => {
  log({ args: fnArgs }, `PRE ${msg}`)

  const result = await fn(...fnArgs)

  log(`POST ${msg}`)

  return result
}
