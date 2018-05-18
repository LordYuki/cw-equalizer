'use strict';

var cw = (cw || {});

(function ($) {

    /**
     * Equalizes elements with the same group
     */
    function Equalizer(element) {
        var self = {};

        var $element = $(element);

        self.init = init;
        self.registerEvents = registerEvents;
        self.initVars = initVars;

        if(!cw.editmode){
           self.init();
        }
        return self;


        function init () {
            self.initVars();
            self.registerEvents();
        }
        function registerEvents () {

        }
        function initVars() {

        }
    }

    /**
     * Service to equalize groups of Divs
     * @returns Service-Object{}
     * @constructor
     */
    function EqualizerService(){
        var eq = {};
        eq.groups = {};

        eq.equalizeAllGroups = equalizeAllGroups;
        eq.equalizeGroup = equalizeGroup;
        eq.init = init;

        eq.init();

        return eq;

        //fetch all groups from dom and register it
        function init(){
            $('.equalize').each(function(i, elem) {

                //check if equalizeGroup is set
                if(typeof elem.dataset.equalizerGroup !== 'undefined'){

                    //if group defined and not already registered, add group
                    if(typeof eq.groups[elem.dataset.equalizerGroup] === 'undefined'){
                         eq.groups[elem.dataset.equalizerGroup] = [];
                    }
                    //add element to group
                    eq.groups[elem.dataset.equalizerGroup].push(elem);
                }
            });

            eq.equalizeAllGroups();

            /**
             * EventListener
             */
            $(window).on('orientationchange resize', equalizeAllGroups);
        }

        /**
         * Fetches all groups and calls equalizeGroup
         */
        function equalizeAllGroups(){
            $.each(eq.groups, function(groupname){
                eq.equalizeGroup(groupname);
            })
        }

        /**
         * Equalizes whole group of elements. finds max-height of groupmembers and assigns it to every member
         * @param groupname
         */
        function equalizeGroup(groupname){
            //find max height of group
            var maxHeight = 0;
            $(eq.groups[groupname]).each(function(){
                $(this).css('height', '');
                if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
            });
            //assign max height to whole group
            $(eq.groups[groupname]).height(maxHeight);


        }
    }

    cw.Equalizer = Equalizer;

    cw.EqualizerService = EqualizerService();

    $(document).ready(function () {

        $('.equalize').each(function (index, element) {
            var $equalizes = $(element);
            var data = $equalizes.data('cw.Equalizer');
            if (!data) {
                $equalizes.data('cw.Equalizer', new Equalizer($equalizes));
            }



        });
    });

})(jQuery);
