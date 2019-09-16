///<reference  path="../../../typings/jquery/index.d.ts"/>

declare type  TJsweetDlgAres={
    id:string;
    topLeft?: { top: 5, left: 5 };
    size?: { height: 100, width: 100 };
    smlSize?: string;
    title?: string;
    content?:string;
    contenUrl?: string;
    dialUrl?: string;
    onload?:()=>void;   
    onclosing:()=>number;
    onclosed:(cld?:any)=>void;
}
//http://www.jeasyui.com/documentation/dialog.php
//https://getbootstrap.com/docs/4.3/components/modal/
declare  class  JSweetDialog{
    Modal():void;
    close(cld?:any):number

}
declare  type  JsweetDlgFactory =(args:TJsweetDlgArgs)=>JSweetDialog;

//JSweetForm   
//http://www.jeasyui.com/documentation/form.php
//https://getbootstrap.com/docs/4.3/components/forms/
//https://jqueryvalidation.org/
declare class  JSweetForm{
    load(data?:TJSweetFormLoad):void 
    /**
     * 得到form表单全部的input值
     * @returns 表单数据
     */
    serialize():{[key:string]:any}
    /**
     * 得到form表单全部的input值
     * @returns 表单数据
     */
    deserialize(args:TJSweetFormDeserialize):any
       /**
     * 校验每个input输入值是否正确
     * @returns 是否正确
     */
    validate(args?:string|HTMLElement|Array<string>): boolean;
    isDirtied(dirtied?: boolean): boolean;
    /**
     * 校验参数
     * @param validateArgs 校验参数
     */
    validateRules(validateArgs: any): void;
    /**
     * 重置form修改状态
     */
    reset(): void;
    /**
     * 
     * @param args submit  form  data  to url
     */
    submit(args?:TJSweetFormSubmit):void
}
declare  type  TJSweetFormCnf={
    id:string;
}
declare  type TJSweetFormDeserialize={[key:string]:any}
declare  type JSweetFormFactory= (args:TJSweetFormCnf)=>JSweetForm;
declare  type TJSweetFormSubmit={
    url?:string;
}
//http://www.jeasyui.com/documentation/datagrid.php
declare   class   JSweetGrid{
    load(args?:TJSweetGridLoad):void
    /**
     * return the number of rows being checked
     * @param rowNum the row to be checked
     */
    checkedRow(rowNum:Array<number>):Array<number>
    /**
     * load finished
     * row was checked
     */
    addLoadFinishedListener(args:TJSweetEvent)
    addRowCheckedListener(args:TJSweetEvent)
    addEventListener(args:TJSweetEvent)
    refresh()
    /**
     * get the data being checked
     * return an array 
     */
    getDataChecked():Array<{[key:string]:any}> 

}
declare type TJSweetGridConf={
    id:string;
    templeteId?:string;
}

declare type TJSweetGridLoad={
    /** service address */
    url?:string;
    /** query parameter */
    param?:{[key:string]:any};
    /** the page being queried */
    curPage?:number;
    /** the total row number per page */
    rowNum?:number;
}
declare type TJSweetEvent={
    /** message type */
    message?:string;
    callback:(e:Event,data:any)=>boolean|undefined;
    data?:any;
}
declare type TJSweetTrigger={
    message?:string;
    data?:any;
}
