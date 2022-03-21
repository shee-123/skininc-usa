// AJAX Recursive addCart
var MGUtil={
    data:[],
    ini:0,
    total:0,
    action:'add',
    reset:function(){
        this.ini=0,this.data=[];
    },
    ajaxpost:function(uri,params,callback){
        $.ajax({
            type: 'POST',
            url : uri,
            dataType: 'json',
            async:false,
            data : params,
            success: function(){
                if(typeof callback === 'function'){
                    callback();
                }
            },
            error: function(){}
        });
    },
    addItem:function(qty,id,properties,callback) {
        var params = {quantity:qty,id:id};
        if(properties != false){
            params.properties = properties;
        }
        MGUtil.ajaxpost('/cart/add.js',params,callback);
    },
    updateItem:function(qty,id,properties,callback){
        var params = {updates: {id: qty}};
        if(properties != false){
            params.properties = properties;
        }
        MGUtil.ajaxpost('/cart/update.js',params,callback);
    },
    recursive:function(){
        var actionname = (MGUtil.action == 'update') ? 'updateItem' : 'addItem' ;
        MGUtil[actionname](MGUtil.data[MGUtil.ini].qty,MGUtil.data[MGUtil.ini].id,MGUtil.data[MGUtil.ini].properties,function(){
            MGUtil.ini += 1;
            if(MGUtil.ini < MGUtil.total){
                MGUtil.recursive();
            }else{
                return false;
                //document.location.href = '/cart';//AFTER TO ADD ITEMS, GO TO THE CART
            }
        });
    },
    begin:function(addAll){
        /*SAMPLE*/
        /* SET YOUR ARRAY QTY's' ID's PROPERTIES(FALSE IF IS EMPTY)*/
        /* SET Action : 'add' , 'update' for performance */
        /* For delete use update with 0 for any item */
        MGUtil.data = addAll;
        MGUtil.total  = MGUtil.data.length;
        MGUtil.action = 'add';
        MGUtil.recursive();
    }
}
// -------------------------------------------
