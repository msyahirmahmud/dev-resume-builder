const assert = require('assert');
const { test, describe } = require('node:test');
const { defaultResumeData, generateHTMLResume, escapeHTML, exportJSON, parseJSON } = require('../app.js');

describe('Dev Resume Builder Unit Tests', () => {
  test('escapeHTML prevents XSS injections', () => {
    const raw = '<script>alert("xss")</script>';
    const escaped = escapeHTML(raw);
    assert.strictEqual(escaped.includes('<script>'), false);
    assert.strictEqual(escaped.includes('&lt;script&gt;'), true);
  });

  test('generateHTMLResume produces valid template string', () => {
    const html = generateHTMLResume(defaultResumeData, 'modern');
    assert.strictEqual(html.includes('Syahir Mahmud'), true);
    assert.strictEqual(html.includes('Full Stack Software Engineer'), true);
    assert.strictEqual(html.includes('theme-modern'), true);
  });

  test('exportJSON and parseJSON handle valid resume payloads', () => {
    const jsonStr = exportJSON(defaultResumeData);
    const parsed = parseJSON(jsonStr);
    assert.notStrictEqual(parsed, null);
    assert.strictEqual(parsed.personalInfo.fullName, 'Syahir Mahmud');
  });

  test('parseJSON rejects malformed data', () => {
    const parsed = parseJSON('{"invalid": true}');
    assert.strictEqual(parsed, null);
  });
});
