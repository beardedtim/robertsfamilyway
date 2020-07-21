export default (
  log: (...args: any[]) => void,
  msg: string,
  fn: (...args: any[]) => any
) => (...fnArgs: any) => {
  log({ args: fnArgs }, `PRE ${msg}`)

  const result = fn(...fnArgs)

  log(`POST ${msg}`)

  return result
}
