const handler = async function (ctx) {
  try {
    const { firstParam } = ctx.params
    const messageFirstMethod = await this.firstMethod()
    return {
      success: true,
      messageFirstAction: 'Hello from first action !',
      firstParam,
      messageFirstMethod
    }
  } catch (e) {
    return {
      success: false,
      error: e.message,
    }
  }
}
module.exports = {
  handler,
  params: {
    firstParam: { 
      type: 'string', 
      optional: true 
    }
  }
}