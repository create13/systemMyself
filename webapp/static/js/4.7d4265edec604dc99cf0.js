webpackJsonp([4],{Wb6U:function(e,t){},fbfZ:function(e,t){},wjZa:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("woOf"),a=s.n(r),o=s("BO1k"),i=s.n(o),n=s("mvHQ"),l=s.n(n),u={name:"baseAcount",data:function(){var e=this;return{receptInfo:null,stateChange:null,popShow:!1,editShow:!1,resetShow:!1,stateName:"启用",loginAcount:"",loginName:"",classSet:"single-forms",percentSet:"percent-forms",authority:!1,getDatas:this.$store.getters.getTabs,popTitle:"",paramsData:{myColor:"",loadingSearch:!1},inputSet:[{lables:"登录账户",models:"",spans:4,types:"input"},{lables:"员工姓名",models:"",spans:4,types:"input"},{lables:"查询",spans:5,types:"button"}],sex:null,treeDatas:[],treeList:[],formBackups:null,formValidate:{},resetPass:{password:"",newPass:"",surePass:""},formData:[{formType:"input",lables:"登录账号",props:"loginName",modelData:"",types:"text"},{formType:"input",lables:"员工姓名",props:"userName",modelData:"",types:"text"},{formType:"radio",lables:"用户性别",props:"userSex",modelData:"男"},{formType:"switch",lables:"登录状态",props:"userStatus",modelData:!0},{formType:"input",lables:"密码",props:"loginPwd",modelData:"",types:"password"},{formType:"input",lables:"职务",props:"userPosition",modelData:"",types:"text"},{formType:"date",lables:"入职时间",props:"departureDate",modelData:""},{formType:"date",lables:"离职时间",props:"hiredate",modelData:""},{formType:"input",lables:"手机号码",props:"userMobile",modelData:"",types:"text"},{formType:"input",lables:"证件号码",props:"userIdnumber",modelData:"",types:"text"},{formType:"input",lables:"地址",props:"userAddress",modelData:"",types:"text"}],passData:[{formType:"input",lables:"原密码",props:"password",modelData:"",types:"password"},{formType:"input",lables:"新密码",props:"newPass",modelData:"",types:"password"},{formType:"input",lables:"确认新密码",props:"surePass",modelData:"",types:"password"}],editDatas:[],editform:{},numberRole:null,getRoleid:null,roleId:[],authorityInfo:{},ruleValidate:{loginName:[{required:!0,message:"请输入登录账号",trigger:"blur"}],userName:[{required:!0,message:"请输入员工姓名",trigger:"blur"}],userSex:[{required:!0,message:"请选择用户性别",trigger:"change"}],userMobile:[{required:!0,message:"请输入手机号码",trigger:"blur"}]},rulePass:{password:[{required:!0,message:"请输入旧密码",trigger:"blur"}],newPass:[{required:!0,message:"请输入新密码",trigger:"blur"}],surePass:[{required:!0,message:"请输入确认密码",trigger:"blur"}]},columnsTable:[{type:"index",width:60,align:"center"},{title:"操作",key:"opration",align:"center",width:123,render:function(t,s){return t("div",[t("a",{props:{size:"small"},style:{marginRight:"6px",color:"#108CEE",textDecoration:"underline"},on:{click:function(){e.show(s.index)}}},"冻结"),t("a",{props:{size:"small"},style:{marginRight:"-5px",color:"#108CEE",textDecoration:"underline"},on:{click:function(){e.show(s.index)}}},"查看明细")])}},{title:"登录账号",key:"loginName"},{title:"员工姓名",key:"userName"},{title:"性别",key:"userSex"},{title:"职务",key:"userPosition"},{title:"入职时间",key:"departureDate"},{title:"离职时间",key:"hiredate"},{title:"手机号码",key:"userMobile"},{title:"证件号码",key:"userIdnumber"},{title:"地址",key:"userAddress"}],tableData:[],roleColumn:[{type:"selection",width:60,align:"center"},{title:"角色名称",key:"roleMemo"},{title:"角色描述",key:"roleDesc"}],roleData:[],selectRole:[],pages:1,sizes:10,rolePage:1,roleSize:10}},components:{},computed:{},watch:{},mounted:function(){this.getList(),this.getTree()},methods:{show:function(){},searchTable:function(){var e=this,t=!0,s=!1,r=void 0;try{for(var a,o=i()(this.inputSet);!(t=(a=o.next()).done);t=!0){var n=a.value;"input"===n.types&&("登录账户"===n.lables?this.loginAcount=n.models:this.loginName=n.models)}}catch(e){s=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(s)throw r}}var u={filters:l()({loginName:this.loginAcount,userName:this.loginName})};this.$service.http.post("winpie/admin/user/list",u,"post").then(function(t){e.tableData=t.result.rows}).catch(function(t){console.log(t),e.$Message.error(t.msg)})},nowStatus:function(){},changeStatus:function(e){!0===e?(this.stateName="启用",this.formValidate.status=!0):(this.stateName="不启用",this.formValidate.status=!1)},editData:function(e,t){1===e.userStatus?e.userStatus=!0:e.userStatus=!1,e&&(this.editform=a()({},e))},colorChange:function(e){this.paramsData.myColor=e},resetColor:function(){this.paramsData.myColor=""},toLoadings:function(){this.$refs.table.exportCsv({filename:"账号管理"})},pageChange:function(e){this.pages=e,this.getList()},newCreate:function(e,t){if(this.popTitle=t,"账号管理新增"===t){var s=!0,r=!1,a=void 0;try{for(var o,n=i()(this.formData);!(s=(o=n.next()).done);s=!0){var u=o.value;"switch"===u.formType?u.modelData=!0:u.modelData=""}}catch(e){r=!0,a=e}finally{try{!s&&n.return&&n.return()}finally{if(r)throw a}}this.formBackups=JSON.parse(l()(this.formData)),this.popShow=!this.popShow}else if("账号管理修改"===t)if(this.editDatas=this.formData,this.editform.userId){var c=!0,d=!1,h=void 0;try{for(var m,f=i()(this.editDatas);!(c=(m=f.next()).done);c=!0){var p=m.value;"loginPwd"===p.props?p.modelData="":p.modelData=this.editform[p.props]}}catch(e){d=!0,h=e}finally{try{!c&&f.return&&f.return()}finally{if(d)throw h}}this.editShow=!this.editShow}else this.$Message.error("请选中要修改的行");else"账号管理删除"===t?this.editform.userId?(this.delInfo(),this.editform.userId=null):this.$Message.error("请选中要删除的行"):"账号管理停用"===t?this.$Message.error("该功能尚未开通，请耐心等候"):"账号管理密码重置"===t?this.editform.userId?this.resetShow=!this.resetShow:this.$Message.error("请选中要修改的行"):"账号管理角色分配"===t&&(this.editform.userId?(this.authority=!this.authority,this.getRole(),this.roleCheck()):this.$Message.error("请选中要修改的行"))},blurData:function(e){var t=!0,s=!1,r=void 0;try{for(var a,o=i()(this.formData);!(t=(a=o.next()).done);t=!0){var n=a.value;this.formValidate[n.props]=e}}catch(e){s=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(s)throw r}}},blurPass:function(e){var t=!0,s=!1,r=void 0;try{for(var a,o=i()(this.passData);!(t=(a=o.next()).done);t=!0){var n=a.value;this.resetPass[n.props]=e}}catch(e){s=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(s)throw r}}},handleSubmit:function(e){var t=this,s=!0,r=!1,a=void 0;try{for(var o,n=i()(this.formData);!(s=(o=n.next()).done);s=!0){var l=o.value;this.formValidate[l.props]=l.modelData}}catch(e){r=!0,a=e}finally{try{!s&&n.return&&n.return()}finally{if(r)throw a}}this.$refs[e].validate(function(s){if(s){!0===t.formValidate.userStatus?t.stateChange=1:t.stateChange=0,"男"===t.formValidate.userSex?t.sex=1:t.sex=0;var r={companyCode:t.$store.getters.getInfo.companyCode,companyId:t.$store.getters.getInfo.companyId,loginName:t.formValidate.loginName,userName:t.formValidate.userName,userSex:t.sex,userStatus:t.stateChange,loginPwd:t.formValidate.loginPwd,userPosition:t.formValidate.userPosition,departureDate:t.formValidate.departureDate,hiredate:t.formValidate.hiredate,userMobile:t.formValidate.userMobile,userIdnumber:t.formValidate.userIdnumber,userAddress:t.formValidate.userAddress,ctypeId:t.$store.getters.getInfo.ctypeId};t.$service.http.post("winpie/admin/user/addupdateuser",r,"post").then(function(s){t.$Message.success("新增成功"),t.$refs[e].resetFields(),t.formData=[],t.formData=t.formBackups,t.getList(),t.popShow=!1}).catch(function(e){console.log(e),t.$Message.error(e.msg)})}else t.$Message.error("Fail!")})},editSubmit:function(e){var t=this,s=!0,r=!1,a=void 0;try{for(var o,n=i()(this.editDatas);!(s=(o=n.next()).done);s=!0){var l=o.value;this.editform[l.props]=l.modelData}}catch(e){r=!0,a=e}finally{try{!s&&n.return&&n.return()}finally{if(r)throw a}}!0===this.editform.userStatus?this.stateChange=1:this.stateChange=0,"男"===this.editform.userSex?this.sex=1:this.sex=0;var u={loginName:this.editform.loginName,userName:this.editform.userName,userSex:this.sex,userStatus:this.stateChange,userPosition:this.editform.userPosition,departureDate:this.editform.departureDate,hiredate:this.editform.hiredate,userMobile:this.editform.userMobile,userIdnumber:this.editform.userIdnumber,userAddress:this.editform.userAddress,userId:this.editform.userId};this.$service.http.post("winpie/admin/user/addupdateuser",u,"post").then(function(e){t.$Message.success("修改成功"),t.getList(),t.editform.userId=null,t.editShow=!1}).catch(function(e){console.log(e),t.$Message.error(e.msg)})},handleReset:function(e){this.$refs[e].resetFields(),this.popShow=!1},cancleForm:function(){this.editShow=!1},getList:function(e){var t=this,s={page:this.pages,rows:this.sizes,filters:l()({companyId:e||this.$store.getters.getInfo.companyId})};this.$service.http.post("winpie/admin/user/list",s,"post").then(function(e){t.tableData=null,t.tableData=e.result.rows;var s=!0,r=!1,a=void 0;try{for(var o,n=i()(t.tableData);!(s=(o=n.next()).done);s=!0){var l=o.value;1===l.userSex?l.userSex="男":l.userSex="女"}}catch(e){r=!0,a=e}finally{try{!s&&n.return&&n.return()}finally{if(r)throw a}}}).catch(function(e){console.log(e)})},delInfo:function(){var e=this,t={userId:this.editform.userId};this.$service.http.post("winpie/admin/user/deleteUser",t,"post").then(function(t){e.$Message.success("删除成功"),e.getList()}).catch(function(t){console.log(t),e.$Message.error(t.msg)})},passSubmit:function(e){var t=this,s=!0,r=!1,a=void 0;try{for(var o,n=i()(this.passData);!(s=(o=n.next()).done);s=!0){var l=o.value;this.resetPass[l.props]=l.modelData}}catch(e){r=!0,a=e}finally{try{!s&&n.return&&n.return()}finally{if(r)throw a}}this.$refs[e].validate(function(s){if(s)if(t.resetPass.newPass===t.resetPass.surePass){var r={userId:t.editform.userId,loginName:t.editform.loginName,loginPwd:t.resetPass.newPass,oldPassword:t.resetPass.password};t.$service.http.post("winpie/admin/user/updatePassword",r,"post").then(function(s){t.$Message.success("密码重置成功"),t.resetShow=!1,t.$refs[e].resetFields(),t.resetPass.newPass="",t.resetPass.surePass=""}).catch(function(e){console.log(e),t.$Message.error(e.msg)})}else t.$Message.error("新密码与确认密码不一致，请重新输入")})},cancleReset:function(e){this.$refs[e].resetFields(),this.resetShow=!1},getRole:function(){var e=this,t={page:this.rolePage,rows:this.roleSize,filters:l()({createCid:this.$store.getters.getInfo.companyId})};this.$service.http.post("winpie/admin/role/list",t,"post").then(function(t){if(e.roleData=t.result.rows,e.selectRole.length){var s=!0,r=!1,a=void 0;try{for(var o,n=i()(e.roleData);!(s=(o=n.next()).done);s=!0){var l=o.value,u=!0,c=!1,d=void 0;try{for(var h,m=i()(e.selectRole);!(u=(h=m.next()).done);u=!0){var f=h.value;l.roleId===f.roleId&&(l._checked=!0)}}catch(e){c=!0,d=e}finally{try{!u&&m.return&&m.return()}finally{if(c)throw d}}}}catch(e){r=!0,a=e}finally{try{!s&&n.return&&n.return()}finally{if(r)throw a}}}}).catch(function(t){console.log(t),e.$Message.error(t.msg)})},roleSubmit:function(e){var t=this,s=!0,r=!1,a=void 0;try{for(var o,n=i()(this.getRoleid);!(s=(o=n.next()).done);s=!0){var l=o.value;this.roleId.push(l.roleId)}}catch(e){r=!0,a=e}finally{try{!s&&n.return&&n.return()}finally{if(r)throw a}}this.numberRole=this.roleId.join(",");var u={role:this.numberRole,userId:this.editform.userId};this.$service.http.post("winpie/admin/user/saveRoleSet",u,"post").then(function(e){t.$Message.success("账号管理权限分配成功"),t.authority=!1}).catch(function(e){console.log(e),t.$Message.error(e.msg)})},selecTable:function(e){this.getRoleid=e},roleCheck:function(){var e=this,t={userId:this.editform.userId};this.$service.http.post("winpie/admin/user/selectUserById",t,"post").then(function(t){e.selectRole=t.roleList}).catch(function(t){console.log(t),e.$Message.error(t.msg)})},cancleRole:function(){this.authority=!1},getTree:function(){var e=this;this.$service.http.post("winpie/api/companyManageTree","","post").then(function(t){e.treeList=[JSON.parse(t.result)],e.recursion(e.treeList)}).catch(function(t){console.log(t),e.$Message.error(t.msg)})},recursion:function(e){var t=[],s=!0,r=!1,a=void 0;try{for(var o,n=i()(e);!(s=(o=n.next()).done);s=!0){var l=o.value,u=l.companyName,c=l.nodes,d=l.companyId;if(c)c=this.recursion(c);t.push({title:u,expand:!0,children:c,onlyId:d})}}catch(e){r=!0,a=e}finally{try{!s&&n.return&&n.return()}finally{if(r)throw a}}return this.treeDatas=t,this.treeDatas},selectDot:function(e){this.getList(e[0].onlyId)}}},c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"manage-set"},[s("div",{staticClass:"center-content"},[s("div",{staticClass:"input-search"},[s("con-inputs",{attrs:{setInput:e.inputSet,paramsData:e.paramsData},on:{changeColor:e.colorChange,resetColor:e.resetColor,searchTable:e.searchTable}})],1),e._v(" "),s("Row",[s("i-col",{attrs:{span:"5"}},[s("div",{staticClass:"fonts-explain"},[e._v("组织结构")]),e._v(" "),s("div",{staticClass:"tree-construction"},[s("Tree",{attrs:{data:e.treeDatas},on:{"on-select-change":e.selectDot}})],1)]),e._v(" "),s("i-col",{attrs:{span:"19"}},[s("div",{staticClass:"input-search row-set"},[s("Row",{attrs:{gutter:20}},[s("i-col",{attrs:{span:"24"}},[s("Button",{attrs:{type:"primary",icon:"android-exit"},on:{click:e.toLoadings}},[s("span",[e._v("导出")])]),e._v(" "),e._l(e.getDatas,function(t,r){return s("Button",{key:r,on:{click:function(s){e.newCreate(t.menuId,t.name)}}},[e._v(e._s(t.name))])})],2)],1)],1),e._v(" "),s("div",{staticClass:"table-show"},[s("Table",{ref:"table",attrs:{columns:e.columnsTable,data:e.tableData,"highlight-row":"",border:""},on:{"on-current-change":e.editData}}),e._v(" "),s("Page",{attrs:{total:100,"show-elevator":""},on:{"on-change":e.pageChange}})],1)])],1)],1)]),e._v(" "),s("Modal",{attrs:{title:e.popTitle,"class-name":"vertical-center-modal","mask-closable":!1},on:{"on-visible-change":e.nowStatus},model:{value:e.popShow,callback:function(t){e.popShow=t},expression:"popShow"}},[s("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":80}},[s("con-checkform",{attrs:{formList:e.formData,setClass:e.classSet,stateName:e.stateName},on:{blurEvent:e.blurData,changeStatus:e.changeStatus}}),e._v(" "),s("FormItem",{staticClass:"lay-btn"},[s("Button",{attrs:{type:"primary"},on:{click:function(t){e.handleSubmit("formValidate")}}},[e._v("保存")]),e._v(" "),s("Button",{staticStyle:{"margin-left":"40px"},on:{click:function(t){e.handleReset("formValidate")}}},[e._v("取消")])],1)],1)],1),e._v(" "),s("Modal",{attrs:{title:e.popTitle,"class-name":"vertical-center-modal","mask-closable":!1},model:{value:e.editShow,callback:function(t){e.editShow=t},expression:"editShow"}},[s("Form",{ref:"editform",attrs:{model:e.editform,"label-width":80}},[s("con-checkform",{attrs:{formList:e.editDatas,setClass:e.classSet},on:{changeStatus:e.changeStatus}}),e._v(" "),s("FormItem",{staticClass:"lay-btn"},[s("Button",{attrs:{type:"primary"},on:{click:function(t){e.editSubmit("editform")}}},[e._v("确定")]),e._v(" "),s("Button",{staticStyle:{"margin-left":"4px"},on:{click:e.cancleForm}},[e._v("取消")])],1)],1)],1),e._v(" "),s("Modal",{attrs:{title:e.popTitle,"class-name":"vertical-center-modal","mask-closable":!1},model:{value:e.resetShow,callback:function(t){e.resetShow=t},expression:"resetShow"}},[s("Form",{ref:"resetPass",attrs:{model:e.resetPass,"label-width":80,rules:e.rulePass}},[s("con-checkform",{attrs:{formList:e.passData,setClass:e.percentSet},on:{blurEvent:e.blurPass}}),e._v(" "),s("FormItem",{staticClass:"lay-btn"},[s("Button",{attrs:{type:"primary"},on:{click:function(t){e.passSubmit("resetPass")}}},[e._v("确定")]),e._v(" "),s("Button",{staticStyle:{"margin-left":"40px"},on:{click:function(t){e.cancleReset("resetPass")}}},[e._v("取消")])],1)],1)],1),e._v(" "),s("Modal",{attrs:{title:e.popTitle,"class-name":"vertical-center-modal","mask-closable":!1},model:{value:e.authority,callback:function(t){e.authority=t},expression:"authority"}},[s("Form",{ref:"authorityInfo",attrs:{model:e.authorityInfo,"label-width":80}},[s("Table",{ref:"selection",attrs:{border:"",columns:e.roleColumn,data:e.roleData},on:{"on-selection-change":e.selecTable}}),e._v(" "),s("FormItem",{staticClass:"lay-btn"},[s("Button",{attrs:{type:"primary"},on:{click:function(t){e.roleSubmit("authorityInfo")}}},[e._v("确定")]),e._v(" "),s("Button",{staticStyle:{"margin-left":"40px"},on:{click:function(t){e.cancleRole()}}},[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var d=s("VU/8")(u,c,!1,function(e){s("fbfZ"),s("Wb6U")},"data-v-f0d5f642",null);t.default=d.exports}});
//# sourceMappingURL=4.7d4265edec604dc99cf0.js.map