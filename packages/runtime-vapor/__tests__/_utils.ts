import { createVaporApp, defineVaporComponent } from '../src'
import type { App } from '@vue/runtime-dom'
import type {
  ObjectVaporComponent,
  VaporComponent,
  VaporComponentInstance,
  VaporSetupFn,
} from '../src/component'
import type { RawProps } from '../src/componentProps'

export interface RenderContext {
  component: VaporComponent
  host: HTMLElement
  instance: VaporComponentInstance | undefined
  app: App
  create: (props?: RawProps) => RenderContext
  mount: (container?: string | ParentNode) => RenderContext
  render: (props?: RawProps, container?: string | ParentNode) => RenderContext
  resetHost: () => HTMLDivElement
  html: () => string
}

export function makeRender<C = ObjectVaporComponent | VaporSetupFn>(
  initHost = (): HTMLDivElement => {
    const host = document.createElement('div')
    host.setAttribute('id', 'host')
    document.body.appendChild(host)
    return host
  },
): (comp: C) => RenderContext {
  let host: HTMLElement
  function resetHost() {
    return (host = initHost())
  }

  beforeEach(() => {
    resetHost()
  })
  afterEach(() => {
    host.remove()
  })

  function define(comp: C) {
    const component = defineVaporComponent(comp as any)
    let instance: VaporComponentInstance | undefined
    let app: App

    function render(
      props: RawProps = {},
      container: string | ParentNode = host,
    ) {
      create(props)
      return mount(container)
    }

    function create(props: RawProps = {}) {
      app?.unmount()
      app = createVaporApp(component, props)
      return res()
    }

    function mount(container: string | ParentNode = host) {
      instance = app.mount(container) as any as VaporComponentInstance
      return res()
    }

    function html() {
      return host.innerHTML
    }

    const res = () => ({
      component,
      host,
      instance,
      app,
      create,
      mount,
      render,
      resetHost,
      html,
    })

    return res()
  }

  return define
}
