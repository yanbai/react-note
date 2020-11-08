<template>
  <div class="hello">
    <section class="container">
      <div style="width:80%">
        <h2 class="title">
          Pantry-SSR-Ready
        </h2>
        <!-- Design Pantry-->
        <div class="ssrWrap">
          <div class="wrap">
            <p class="brief">Pantry Button</p>
            <dp-pantry-button class="dp-button--primary" href="http://www.google.com">
              <span>button</span>
            </dp-pantry-button>
          </div>

          <div class="wrap">
            <p class="brief">Pantry Label</p>
            <dp-pantry-label :discount-text="discountText">
              {{ labelText }}
            </dp-pantry-label>
          </div>

          <div class="wrap">
            <p class="brief">Pantry SearchBar</p>
            <dp-pantry-search-bar
              :options="optionsSearch"/>
          </div>
          <div class="wrap">
            <p class="brief">Pantry Tabs</p>
            <dp-pantry-tabs :is-tab-underline="isTabUnderline">

              <dp-pantry-tab-item label="tab 1">
                <div>
                  <h1>Put any elements you want</h1>
                </div>
              </dp-pantry-tab-item>

              <dp-pantry-tab-item label="tab 2">
                <div>
                  <h1>tab 2</h1>
                </div>
              </dp-pantry-tab-item>

              <dp-pantry-tab-item label="tab 3">
                <div>
                  <h1>Put any elements you want</h1>
                </div>
              </dp-pantry-tab-item>

            </dp-pantry-tabs>
          </div>
          <div class="wrap">
            <p class="brief">Pantry Quote</p>
            <dp-pantry-quote type="pull">
              “Always compare between different policies to see if the coverage is right for what you’re doing.”
            </dp-pantry-quote>
          </div>
          <div class="wrap">
            <p class="brief">Pantry Article Tile</p>
            <dp-pantry-article-tile :type="tileType">
              <template slot="img">
                <div
                  class="dp-tile__img"
                  role="img"
                  aria-label="article image"
                  style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535016240075&di=572ab2538498fac8195d6001a883156c&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fu%2F00%2F02%2F82%2F06%2F561c95213aaa4.jpg);"/>
              </template>
              <template slot="title"><div class="dp-tile__title">8 Tips to Save Money Everyday very long title</div></template>
              <template slot="desc"><p class="dp-tile__desc">Vivamus venenatis urna non mi vulputate, lobortis blandit nunc ultricies.</p></template>
              <template slot="author"><span class="dp-tile__author">By Jeremy</span></template>
              <template slot="label">
                <span class="dp-tile__label dp-label">
                  <small>credit cards</small>
                </span>
              </template>
              <template slot="date"><span class="dp-tile__date">Feb 16, 2018</span></template>
            </dp-pantry-article-tile>
          </div>
          <div class="wrap">
            <p
              class="brief brief-margin">Pantry Author Byline</p>
            <dp-pantry-author-byline
              :max-width="40"
              :max-height="40"
              :is-span-wrap="false"
              author="author"
              author-avatar="https://picsum.photos/62"
              alt="alt"
              href="href"/>
          </div>
          <div class="wrap">
            <p
              class="brief brief-margin">Pantry Author Profile</p>
            <dp-author-profile
              author="author"
              link-button-text="linkButtonText"
              author-avatar="https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/322fb61b32f50a13b88acced96470b6ec60960be51b88f1b9245961aa493108619b7d0afbe55963c26aae99a6769c112?pictype=scale&from=30113&version=3.3.3.3&uin=3281858405&fname=articale-tile-img.jpg&size=750"
              alt="alt"
              link-url="authorAvatar"
              description="description"/>
          </div>
          <div class="wrap">
            <p class="brief brief-margin">Pantry Text Link</p>
            <dp-link link-text="This is text link"></dp-link>
          </div>
          <div class="wrap">
            <p class="brief brief-margin">Pantry Brand</p>
            <dp-pantry-brand country="sg">
            </dp-pantry-brand>
          </div>

          <div class="wrap">
            <p class="brief brief-margin">Pantry Panel</p>
            <dp-pantry-panel
              panel-linked="http://www.google.com"
              panel-title="panel title">
            </dp-pantry-panel>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      tileType: 'full',
      labelText: 'NEW',
      discountText: 'Pantry Label',
      isTabUnderline: true,
      optionsSearch: [
        { text: 'ba al', url: 'baal' },
        { text: 'Blgeria', url: 'apple' },
        { text: 'Albania', url: 'banana' },
        { text: 'Abal', url: 'Abal' },
        { text: 'afghanistan', url: 'Cherry' },
        { text: 'Blgeria2', url: 'Lemon' },
        { text: 'Blgeria3', url: 'Pear' },
        { text: 'Blgeria4', url: 'Orange' },
        { text: 'Blgeria5', url: 'Mango' }
      ]
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.ssrWrap {
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
.wrap {
  padding: 20px;
  border-bottom: 1px dotted #ccc;
}
p.brief {
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 0;
}
p.brief-margin {
  margin-bottom: 15px;
}
.VueToNuxtLogo {
  margin-top: 20px;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle,
.brief {
  font-weight: 300;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
h2 {
  font-size: 42px;
}
.links {
  padding-top: 15px;
}
.dp-button,
.dp-tabs--underline,
.dp-field__search-bar,
.dp-label,
.dp-tabs--underline,
.dp-quote,
.dp-tile__article {
  margin-top: 15px;
  max-width: 800px;
}
</style>
