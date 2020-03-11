# GMSOFT-UI 组件库  

[![NPM](https://img.shields.io/npm/v/gmsoft-ui.svg)](https://www.npmjs.com/package/ui)
[![DOWNLOAD](https://img.shields.io/npm/dt/gmsoft-ui.svg)](https://www.npmjs.com/package/gmsoft-ui)
## install

```

  yarn add gmsoft-ui

```

## Modal 

> 解决渲染到top时，滚动条异常的问题

### Props  

| 属性               | 说明                                                | 类型                                                   | 默认值                  |  版本 |
| :----------------- | :-------------------------------------------------- | :----------------------------------------------------- | :---------------------- | ----: |
| getContainer       | 指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom | HTMLElement \| () => HTMLElement \| Selectors \| false | () => top.document.body | 1.0.1 |
| size               | 宽度方案                                            | 'small' \| 'default' \| 'large'                        | 'default'               | 1.0.0 |
| children           | 子级节点                                            | React.ReactNode                                        | -                       | 1.0.0 |
| ~~destroyOnClose~~ | 关闭时销毁 Modal 里的子元素                         | **作废**                                               | -                       | 1.0.0 |
### Context  

 - children 外用 Antd 的 ```ConfigProvider``` 包裹，配置的默认参数有：
    - getPopupContainer：triggerNode => triggerNode.parentNode  
    

## Drawer 

> 解决渲染到top时，滚动条异常的问题

### Props  

| 属性               | 说明                                                | 类型                                                   | 默认值                  |  版本 |
| :----------------- | :-------------------------------------------------- | :----------------------------------------------------- | :---------------------- | ----: |
| getContainer       | 指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom | HTMLElement \| () => HTMLElement \| Selectors \| false | () => top.document.body | 1.0.1 |
| size               | 宽度方案                                            | 'small' \| 'default' \| 'large'                        | 'default'               | 1.0.0 |
| children           | 子级节点                                            | React.ReactNode                                        | -                       | 1.0.0 |
| ~~destroyOnClose~~ | 关闭时销毁 Modal 里的子元素                         | **作废**                                               | -                       | 1.0.0 |
| onClickCapture     | 点击窗体（整个Drawer）回调                          | MouseEvent=>void                                       | -                       | 1.0.0 |
### Context  

 - children 外用 Antd 的 ```ConfigProvider``` 包裹，配置的默认参数有：
    - getPopupContainer：triggerNode => triggerNode.parentNode  
  

### popup function
如果 `top.eventBus` 存在
-- 通过 `top.eventBus.emit` 发送相应的事件
否则
-- 直接调用 `antd` 对应组件的 `function`

> api 和 antd 一致

```
message.info
message.success
message.error
message.warning
message.loading

Modal.info
Modal.success
Modal.error
Modal.warning
Modal.confirm

notification.info
notification.success
notification.error
notification.warning
```



## 更新日志  

- ### 1.2.4 
  2020-3-11
  - 🐞 getTopRoot 默认选中元素改为 #mount-root
- ### 1.2.1 
  2020-1-10
  - 🌟 新增 popup function, 提示弹层的调用对应用透明
- ### 1.1.0  
  2020-1-7
  调试  
- ### 1.0.1  
  2020-1-7      
  - 🌟 ```Drawer```、```Modal```，新增 ```getContainer```