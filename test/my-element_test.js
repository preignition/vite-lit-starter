/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { MyElement } from "../src/my-element.js";
import { fixture, expect, assert } from "@open-wc/testing";
import { html } from "lit/static-html.js";

describe("my-element", () => {
  it("is defined", () => {
    const el = document.createElement("my-element");
    assert.instanceOf(el, MyElement);
  });

  it("renders with default values", async () => {
    const el = await fixture(html`<my-element></my-element>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  it("renders with a set name", async () => {
    const el = await fixture(html`<my-element name="Test"></my-element>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  it("handles a click", async () => {
    const el = await fixture(html`<my-element></my-element>`);
    const button = el.shadowRoot.querySelector("button");
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });

  it("styling applied", async () => {
    const el = await fixture(html`<my-element></my-element>`);
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, "16px");
  });
  
  it('element is accessible', async () => {
    const el = await fixture(html` <my-element></my-element> `);
    await expect(el).to.be.accessible();
  });
});
