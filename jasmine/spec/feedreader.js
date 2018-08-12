/*jshint esversion: 6 */
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    describe('RSS Feeds', function() {
        /* Test that makes sure allFeeds is defined */
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed in the allFeeds object
         * and ensures it has a URL defined and not empty.
         */
        it('URL is defined', function() {
          for(var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url).not.toEqual('');
          }
        });

        /* Test that loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
        it('name is defined', function() {
          for(var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name).not.toEqual('');
          }
        });

    });


    /* Test suite to ensure menu element is hidden by default and
     * changes visibility when the menu icon is clicked.
     */
    describe('The Menu', function() {
        let bodyClass = document.querySelector('body');
        let menuVisible;

        if (bodyClass.classList.contains('menu-hidden')) {
          menuVisible = false;
        } else {
          menuVisible = true;
        }

        /* Test that ensures the menu element is hidden by default*/
        it('is hidden by default', function() {
          expect(menuVisible).toBe(false);
        });

        /* Test that ensures the menu changes visibility when the menu icon
         * is clicked.
         */
        it("visibility changes when clicked", function () {
          if (bodyClass.classList.contains('menu-hidden')) {
            expect(menuVisible).toBe(false);
          } else {
            expect(menuVisible).toBe(true);
          }
        });

    });

    /* Test suite that ensures when the loadFeed function is called
     * and completes its work, there is at least a single .entry element
     * within the .feed container.
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
          loadFeed(0, done); //see init()
        });

        /* Test that ensures load feed is complete with at least one entry */
        it('loadFeed is complete and contains at least one entry', function() {
          let feed = document.querySelector('.feed');
          let entries = feed.getElementsByClassName('entry').length;

          expect(entries.length).not.toBe(0);
        });

    });

    /* Test suite that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    describe('New Feed Selection', function() {
        let currentFeedOne;
        let currentFeedTwo;

        beforeEach(function(done) {
          loadFeed(0, function() {
            currentFeedOne = document.querySelector('.feed').innerHTML;
            done();
          });
        });

        /* Test that ensures content changes when new feed loaded */
        it('feed content changes when new feed loaded', function(done) {
          loadFeed(1, function() {
            currentFeedTwo = document.querySelector('.feed').innerHTML;
            expect(currentFeedTwo).not.toEqual(currentFeedOne);
            done();
          });
        });

    });

}());
