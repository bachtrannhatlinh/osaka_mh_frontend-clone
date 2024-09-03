export default function useReloadPageWithTime() {
  //reload home after 30s
  window.setTimeout(function () {
    window.location.reload()
  }, 30000)
}
