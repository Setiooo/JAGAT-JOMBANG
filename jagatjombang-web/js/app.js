var NAV=["beranda","pasar","budaya","sastra","inkubator"];
function go(id){
 var ss=document.querySelectorAll(".screen");
 for(var k=0;k<ss.length;k++){ss[k].classList.remove("active");}
 var t=document.getElementById("scr-"+id); if(t){t.classList.add("active");}
 var nw=document.getElementById("navwrap");
 nw.style.display=(id==="onboarding"||id==="detail")?"none":"block";
 var base=(id==="detail")?"pasar":id;
 var ns=document.querySelectorAll(".nav .n");
 for(var j=0;j<ns.length;j++){ns[j].classList.remove("on");}
 var idx=NAV.indexOf(base);
 if(idx>=0){ns[idx].classList.add("on");}
 var sc=t?t.querySelector(".scroll"):null; if(sc){sc.scrollTop=0;}
}
document.getElementById("navwrap").style.display="none";
