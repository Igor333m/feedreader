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
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

         it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        allFeeds.forEach( (obj) => {

            /* Write a test that loops through each feed
             * in the allFeeds object and ensures it has a URL defined
             * and that the URL is not empty.
             */
            it("URL-s are defined and not empty", () => {
                expect(obj.url).toBeDefined();
                expect(obj.url.length).not.toBe(0);
            });            
            /* Write a test that loops through each feed
             * in the allFeeds object and ensures it has a name defined
             * and that the name is not empty.
             */
            it("names are defined and not empty", () => {
                expect(obj.name).toBeDefined();
                expect(obj.name.length).not.toBe(0);
            });
        });
    });

    /* Write a new test suite named "The menu" */
    describe("The menu", () => {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         let bodyClass = $("body");
         it("menu element is hidden by the default", () => {
            expect(bodyClass.hasClass("menu-hidden")).toBe(true);
         });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it("menu element is visible when the menu icon is clicked", () => {
            // verify after the menu icon is clicked once, the menu displays
            $('.menu-icon-link').click();
            expect(bodyClass.hasClass("menu-hidden")).not.toBe(true);
          });
          it("menu element is hidden when the menu icon is clicked", () => {
            $('.menu-icon-link').click();
            expect(bodyClass.hasClass("menu-hidden")).toBe(true);
          });
    });

    /* Write a new test suite named "Initial Entries" */
    describe("Initial Entries", () => {

        let firstChild;

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it("loadFeed function is called and completes its work", () => {
            firstChild = $(".feed > a:nth-child(1) > article");
            expect(firstChild.hasClass("entry")).toBe(true);
            });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection",  () => {
        let feed,
            newFeed;

        beforeEach(function(done) {
            loadFeed(0, () => {
                feed = $(".feed").html();
                done();
            });
        });
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it("new feed is loaded by the loadFeed function", (done) => {
            loadFeed(1, () => {
                newFeed = $(".feed").html();
                expect(feed).not.toBe(newFeed);
                done();
            });
        });
    });
}());
