function drag(id)
{
	var target;
	var positionParam={};
	var control=
	{
		empty:function(obj)
		      {
		      	  if(obj==undefined||obj==null||obj=="")
		      	      return true;
		      	  
		      	  return false;  
		      },
		      
		exception:function(tip)
			 {
			 	 console.log("dragErr:"+tip);
				 throw new Error(tip);
			 },
			 
	    getTarget:function (id)
	         {
	        	target=document.getElementById(id);
	        	if(this.empty(target))
	        		throw new Error("无法找到这个id")
	        	return target;
	         },
	         
	    getEvent:function (e)
	        {
	        	return e||window.event;
	        },
	    
//简单测试也没什么问题，但是clientX与clientY获取的是相对于当前浏览器窗口的坐标，忽略页面滚动因素，这在很多条件下很有用，但当我们需要考虑页面滚动，也就是相对于文档（body元素）的坐标时怎么办呢？加上滚动的位移就可以了，下边我们试试怎么计算页面滚动的位移。
//
//其实在Firefox下问题会简单很多，因为Firefox支持属性pageX,与pageY属性，这两个属性已经把页面滚动计算在内了。
//
//在Chrome可以通过document.body.scrollLeft，document.body.scrollTop计算出页面滚动位移，而在IE下可以通过document.documentElement.scrollLeft ，document.documentElement.scrollTop
	   
	    getPageLocation:function (event)
		    {
		    	var e = this.getEvent(event);
	            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	            var x = e.pageX || e.clientX + scrollX;
	            var y = e.pageY || e.clientY + scrollY;
	            return { 'x': x, 'y': y };
		    },
		   
		getItemLocation:function(event)
			{
				var e = this.getEvent(event);
				return {'x':e.layerX||e.offsetX,'y':e.layerY||e.offsetY}
			},
		getCss:function(o,key)
			{
				return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
			}
	}
	
	function dragEnd(e) 
	  	{
//              if (target.releaseCapture) 
//              {
//                  target.releaseCapture();
//              }
//              else if (window.releaseEvents) 
//              {
//                  window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
//              }
                //target.removeEventListener("mousedown",dragStart);
               document.removeEventListener("mousemove",dragMove)
               document.removeEventListener("mouseup",dragEnd)
     	}
	  
	function dragMove(e) 
		{
//				var itemLocation=control.getItemLocation(e);
//		      	var x = itemLocation.x;
//		        var y = itemLocation.y;
            	var pageLocation=control.getPageLocation(e);
                var tx = pageLocation.x-positionParam.Location.x;
                var ty = pageLocation.y-positionParam.Location.y;
                target.style.left = positionParam.Left+tx +"px";
                target.style.top = positionParam.Top+ty+"px";
    	}
	
	function dragStart(e) 
		{
//		            if (target.setCapture) 
//		            {
//		                target.setCapture();
//		            }
//		            else if (window.captureEvents) 
//		            {
//		                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
//		            }
		            positionParam.Location=control.getPageLocation();
		            //positionParam.Left=control.empty(target.style.left)?0:parseInt(target.style.left.replace("px",""));
		           //positionParam.Top=control.empty(target.style.top)?0:parseInt(target.style.top.replace("px",""));
		           //获取不到class内的属性
		            positionParam.Left=control.getCss(target,"left")=="auto"?0:parseInt(control.getCss(target,"left").replace("px",""));
		            positionParam.Top=control.getCss(target,"top")=="auto"?0:parseInt(control.getCss(target,"top").replace("px",""));
		            document.addEventListener("mousemove",dragMove)
		            document.addEventListener("mouseup",dragEnd)
         }
		
	target=control.getTarget(id);
    target.addEventListener("mousedown",dragStart);
    target.style.position="absolute";
}
