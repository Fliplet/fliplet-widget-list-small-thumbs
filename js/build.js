window.ui = window.ui || {};
Fliplet.Widget.instance('list-thumb-s', function(data) {
  var $container = $(this);
  var _this = this;

  Fliplet().then(function() {
    var swipeToSaveLabel = data.swipeToSaveLabel || T('widgets.list.smallThumbs.defaultListName');

    $container.translate({ swipeToSaveLabel: swipeToSaveLabel });

    if (data.swipeToSave) {
      ui['swipeSavedList' + $container.attr('data-list-thumb-s-uuid')] = new SwipeSaveList(_this, {
        savedListLabel: swipeToSaveLabel
      });
    }
  });

  function authenticateImages() {
    FlipletSmallThumbUtils.forEach(data.items, function(item) {
      var url = FlipletSmallThumbUtils.get(item, 'imageConf.url');

      if (!url || !Fliplet.Media.isRemoteUrl(url)) {
        return;
      }

      $container.find('.has-image[data-thumb-s-item-id="' + item.id + '"] .list-image').css({
        backgroundImage: 'url(' + Fliplet.Media.authenticate(url) + ')'
      });
    });
  }

  $container.on('click', '.linked[data-thumb-s-item-id]', function(event) {
    event.preventDefault();

    if ($(this).parents('.list-swipe.swiping').length) {
      return;
    }

    var itemData = FlipletSmallThumbUtils.find(data.items, {
      id: $(this).data('thumb-s-item-id')
    });

    if (FlipletSmallThumbUtils.get(itemData, 'linkAction') && !FlipletSmallThumbUtils.isEmpty(itemData.linkAction)) {
      Fliplet.Navigate.to(itemData.linkAction);
    }
  });

  Fliplet().then(authenticateImages);
});
