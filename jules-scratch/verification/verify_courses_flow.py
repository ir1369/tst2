import re
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Go to the course catalog page
        page.goto("http://localhost:3000/courses")

        # 2. Assert that the main heading is visible
        expect(page.get_by_role("heading", name="Explore Our Courses")).to_be_visible()

        # 3. Find the first course card and click it.
        # We find all links that seem to be course cards and click the first one.
        # This is a bit fragile, but good enough for a verification script.
        first_course_link = page.locator('a[href*="/course/"]').first
        expect(first_course_link).to_be_visible()
        first_course_link.click()

        # 4. On the course detail page, wait for the new page to load and assert the title exists.
        # We expect the URL to have changed.
        expect(page).to_have_url(re.compile(r"/course/.*"))
        # We expect an H1 element for the title.
        expect(page.locator("h1")).to_be_visible()

        # 5. Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        # Take a screenshot even on error for debugging
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
