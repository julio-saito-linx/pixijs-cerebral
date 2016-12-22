export default {
  state: {},
  signals: {
    redirectTo: [
      ({router, input}) => {
        router.redirect(`/${input.destination}`)
      }
    ]
  }
}
