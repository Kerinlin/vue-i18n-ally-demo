## "工业革命"--我的多语言开发之路(内附神器)

相信不少前端er在遇到多语言需求时，都会遇到下面的问题

1. 开发完成后面对众多语言key，需要将真实内容提取到语言包中，在不同的文件中切换来切换去，非常繁琐
2. 经常漏翻，可能翻了一个语言，另一个语言就忘记翻了
3. 维护起来太麻烦，遇到新需求增加的语言文件，又需要同时在多个语言文件上进行同步更新
4. debug太难受，时间一长无法立马准确知道当前key对应的是什么内容，又需要自己去对照语言包去查看

这只是其中的一部分，还有很多问题，这里就不列举了。后面实在受不了了，就去寻找是否有更优解，尝试过很多插件，直到我发现了它-----**i18n-ally**，它的出现成功的解决了我上面所有的痛点，而且还做得更多，无论是开发效率还是开发体验，都是指数级的增长！

### i18n-ally

这是一个vscode插件，项目已经开源[i18n-ally](https://github.com/lokalise/i18n-ally),也是vue i18n项目官方推荐的第三方工具。它提供了

1. 内联提示功能，通过内联提示功能，你能很方便的进行debug，再也不会出现面对一堆key时而不知所措的情况

   ![](https://github.com/lokalise/i18n-ally/blob/screenshots/annotation-animated.gif?raw=true)

2. 当前页面悬浮窗快速修改key值对应的语言文件,再也不需要频繁的切换语言包然后找key修改了

   ![](https://github.com/lokalise/i18n-ally/blob/screenshots/hover.png?raw=true)

3. 统一管理所有翻译,对于使用的，未使用的，翻译进度等都能做到很好的监控，同时提供了**自动翻译**的功能，自动翻译并将翻译结果应用到相应的语言包中

   ![image-20211218171419937](https://s2.loli.net/2021/12/18/MexXv7ZEBFihYCP.png)

4. 灵活方便提取页面上未翻译的文字内容,自动根据结构在相应的位置建立对应的翻译key

   ![ezgif.com-gif-maker](https://s2.loli.net/2021/12/20/EgjIvOw9C3YM5rA.gif)

5. 更多功能，请看[官方文档](https://github.com/lokalise/i18n-ally)自行探索



### 如何配置

下面会通过保姆级别的配置说明搭建一个高效的多语言工作环境

#### 配置工作区

首先说一下vscode的工作区，相信在大部分时候，很多人都是用的一个工作区，一个总的配置文件，这样在项目多起来的时候，弊端就特别明显，如果仅仅某些项目需要用到的配置，却放在了全局设置里面，项目多起来会导致配置文件很杂乱，基于项目的工作区开发配置就显得特别重要。维护一些特定需求的工作区配置，对于日常开发来说，是很有必要的。比如后面要讲的多语言，只要有类似需求的都能向工作区添加文件，当有时候忘记一些开发套路的时候，因为都是同类项目，也能很方便的在同一个工作区找到类似代码进行cv操作。总的来说工作区是vscode在不同的项目应用不同配置的解决方案。更多关于工作区的介绍可看 [这篇文章](https://zhuanlan.zhihu.com/p/54770077)，我的做法是建一个叫工作区的文件夹，里面全都放置着.code-workspace后缀的工作区配置文件，统一管理。

![image-20211220210348879](https://s2.loli.net/2021/12/20/GD1vIJ46rxbRFhC.png)

```json
{
  //工作区配置,如果要配置多个文件夹，直接添加path即可，路径path是当前配置文件相对于真实的项目路径的
  "folders": [
    {
      "path": "../frontStudy/vue-test-case"
    },
    // {
    //   "path": "../company/secondProject/explorer"
    // }
  ],
  "settings": {
    //vscode在当前工作区的配置
  }
  //其他的选项请查看vscode文档
}
```



#### 配置多语言

多语言的配置，vue项目使用的是vue-i18n与上面说的i18n-ally插件的结合。

1. 安装i18n-ally，vscode插件商店直接搜索安装

2. 建立工作区配置文件xxx.code-workspace，可以跟我一样设置专门的工具区配置文件夹，也可以直接设置在项目里，填入配置，将项目文件夹通过folders添加进工作区，然后通过vscode打开配置文件

```json
{
  //工作区配置,如果要配置多个文件夹，直接添加path即可，路径path是当前配置文件相对于真实的项目路径的
  "folders": [
    {
      "path": "../frontStudy/vue-test-case"
    },
    // {
    //   "path": "../company/secondProject/explorer"
    // }
  ]
}
```

3. 在项目下安装vue-i18n,并建好语言包文件夹

```javascript
yarn add vue-i18n
```

**创建语言包文件夹locales以及语言文件**

![image-20211220213851119](https://s2.loli.net/2021/12/20/z2dx7oRrK3Ltuhe.png)

4. 在工作区配置文件中添加i18n-ally配置

```json
  "settings": {
    "i18n-ally.localesPaths": ["src/locales"], //配置工作区内的语言包文件夹的匹配路径，可以为多个匹配
    "i18n-ally.extract.keygenStyle": "camelCase", //对默认生成的key的命名
    "i18n-ally.keystyle": "nested", //对于key的处理,包裹nesta:{b:{c:value}}, 展平flat a.b.c: value
    "i18n-ally.review.enabled": false,
    "i18n-ally.annotationMaxLength": 30
  }
```

5. 编写i18n.js并在main.js中引入

```javascript
import Vue from "vue";
import VueI18n from "vue-i18n";
import cn from "./zh-CN/index.json";
import en from "./en/index.json";

Vue.use(VueI18n);
const langList = ["en", "zh"];

const initKey = initLangKey();


// 初始化语言key
function initLangKey() {
    let langkey = localStorage.getItem("langkey");
    // 如果未初始化，通过浏览器判断应该设置成啥语言
    if (!langkey) {
        const lang = (navigator.language || navigator.browserLanguage)
            .toLowerCase()
            .substring(0, 2);
        switch (lang) {
            case "en":
                langkey = "en";
                break;
            case "zh":
                langkey = "zh";
                break;

            default:
                langkey = "en";
                break;
        }
    } else if (!langList.includes(langkey)) {
        // 如果不是en,zh,默认en
        langkey = "en";
    }
    localStorage.setItem("langkey", langkey);
    return langkey;
}

const i18n = new VueI18n({
    locale: initKey,
    messages: {
        en: Object.assign({}, en),
        zh: Object.assign({}, cn),
    },
});

export default i18n;
```

在main.js中引入

```javascript
import i18n from './locales/i18n.js'

new Vue({
    i18n,
    render: h => h(App)
}).$mount('#app')
```

6. 享用i18n-ally带来的生产力的提升

### 注意事项

1. 对于不同框架以及更多功能的探索，可通过[官方的examples]()去查看，比较详细，有配置也有语言包文件的配置

![image-20211220220324073](https://s2.loli.net/2021/12/20/c5wr7uzxKM6IqhV.png)

2. 不同格式的权限是不同的，i18n-ally对js文件的只能读取key，无法写入更改key,默认情况下，除了JSON,YAML,JSON5，其他的都是关闭的，如果需要支持，需要添加配置，支持情况如下

![image-20211220222528696](https://s2.loli.net/2021/12/20/1HRmVZIrbQj3MgU.png)

### 最后

i18n-ally带给我的体验是,从刀耕火种到工业时代，极大的提升了我做多语言时的开发体验，感谢开发者们提供了这种对我来讲是划时代的开发工具。本文案例代码已放入[github]()。

