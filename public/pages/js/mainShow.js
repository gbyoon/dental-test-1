

'use strict';
(function (docu, win) {
    var animation_time = 600;
    var btn_move_limit = 30;
    var item_showing = false;
    var className = {
        show_items: 'menu--list__show',
        revolve: 'menu--list__revolve',
        button_cross: 'bar__crossy'
    };
    var $el = {
        toggle_btn: docu.querySelector('.js-menu--toggle'),
        menu_items: docu.querySelector('.js-menu--list'),
        items: docu.querySelectorAll('.js-item')
    };
    var constrain = function constrain(val, lim) {
        return val > lim ? lim : val < -lim ? -lim : val;
    };
    var setButtonPosition = function setButtonPosition(left, top) {
        $el.toggle_btn.style.left = constrain(left, btn_move_limit) + 'px';
        $el.toggle_btn.style.top = constrain(top, btn_move_limit) + 'px';
    };
    var showAllItems = function showAllItems() {
        var item_menu = $el.menu_items.classList;
        item_menu.add(className.show_items);
        setTimeout(function () {
            item_menu.add(className.revolve);
            $el.toggle_btn.classList.add(className.button_cross);
            item_showing = true;
        }, animation_time);
    };
    var hideAllItems = function hideAllItems() {
        var item_menu = $el.menu_items.classList;
        item_menu.remove(className.revolve);
        $el.toggle_btn.classList.remove(className.button_cross);
        setTimeout(function () {
            item_menu.remove(className.show_items);
            item_showing = false;
            setButtonPosition(0, 0);
        }, animation_time);
    };
    var findPosRelative = function findPosRelative(e) {
        e = e.pageX ? {
            pageX: e.pageX,
            pageY: e.pageY
        } : e.touches[0];
        var offset = {
            x: win.innerWidth / 2,
            y: win.innerHeight / 2
        };
        e.pageX = e.pageX - offset.x;
        e.pageY = e.pageY - offset.y;
        return e;
    };
    var menuBtnClickHandler = function menuBtnClickHandler() {
        if (item_showing)
            hideAllItems();
        else
            showAllItems();
    };
    var itemClick = function itemClick(e) {
        var item_id = e.target.dataset.id;
        console.log('Item ID: ' + item_id);
        hideAllItems();
    };
    var mouseMoveMent = function mouseMoveMent(e) {
        var left, top;
        if (item_showing) {
            e = findPosRelative(e);
            left = 140 * e.pageX / win.innerWidth;
            top = 140 * e.pageY / win.innerHeight;
        } else {
            left = 0;
            top = 0;
        }
        setButtonPosition(left, top);
    };
    docu.addEventListener('DOMContentLoaded', function () {
        $el.toggle_btn.addEventListener('click', menuBtnClickHandler);
        for (var i = 0; i < $el.items.length; i++) {
            if (window.CP.shouldStopExecution(1)) {
                break;
            }
            $el.items[i].addEventListener('click', itemClick);
        }
        window.CP.exitedLoop(1);
        win.addEventListener('mousemove', mouseMoveMent);
        win.addEventListener('touchmove', mouseMoveMent);
    });
}(document, window));