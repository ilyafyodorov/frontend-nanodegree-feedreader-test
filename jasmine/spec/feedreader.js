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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Ttest that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined urls', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have defined names', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* "The menu" test suite */
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         var body = $('body');

         it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toEqual(true);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        var menuIconLink = $('.menu-icon-link');
        it('changes visibility when the menu icon is clicked', function() {
            menuIconLink.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIconLink.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });

    /* "Initial Entries" test suite */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test
         * uses of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('have minimum of 1 entry in the feed container', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });

    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        var contentOne;
        var contentTwo;

        //beforeEach to wait for async calls to finish
        beforeEach(function(done) {
            loadFeed(1, function() {
                contentOne = $('.feed').html();
                loadFeed(0, function() {
                    done();
                });
            });
        });

        //check that each content is defined
        //compare html from contentOne and contentTwo
        it('changes content upon feed source change', function() {
            expect(contentOne).toBeDefined();
            contentTwo = $('.feed').html();
            expect(contentTwo).toBeDefined();
            expect(contentOne).not.toEqual(contentTwo);
        });

    });

}());
