const $siteList = $(".siteList");
const $lastLi = $(".lastLi");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "D", url: "https://developer.mozilla.org/zh-CN/" },
  { logo: "G", url: "https://github.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace('//','')
    .replace(/\..*/,'')
};
const render = () => {
  $siteList.find("li:not(.lastLi)").remove();
  hashMap.forEach((node,index) => {
      const $li = $(`
            <li>
                <div class=site>
                    <div class='logo'>${simplifyUrl(node.url)[0].toUpperCase()}</div>
                    <div class='link'>${simplifyUrl(node.url)}</div>
                    <svg class="icon delIcon">
                        <use xlink:href="#icon-delete"></use>
                    </svg>
                </div>
            </li>
    `).insertBefore($lastLi);
    $li.on('click',()=>{
        window.open(node.url,'_self')
    })
    $li.on('click','.delIcon',(e)=>{
        e.stopPropagation()
        hashMap.splice(index,1)
        render()
    })
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on('keypress',(e)=>{
  const {key} = e
  for(let i=0;i<hashMap.length;i++){
    if (hashMap[i].logo.toLowerCase() === key){
      window.open(hashMap[i].url)
    }
  }
})
