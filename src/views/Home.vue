<template>
  <div class="list">
    <p class="item">{{$t('item')}}</p>
    <p class="item">{{$t('btn.b1')}}</p>
    <p class="item">{{ $t('qu-xiao') }}</p>
    <p class="item">{{ $t('btn.b2') }}</p>
    <p class="item">{{ $t('btn.b3.b1') }}</p>
    <p class="item">{{ $t('btn.b3.b2') }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '按钮',
    };
  },
  name: 'Home',
};
</script>
