// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
	{
		files: ["**/*.ts"],
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
		],
		processor: angular.processInlineTemplates,
		rules: {
			"@angular-eslint/directive-selector": [
				"error",
				{
					type: "attribute",
					prefix: "app",
					style: "camelCase",
				},
			],
			"@angular-eslint/component-selector": [
				"error",
				{
					type: "element",
					prefix: "app",
					style: "kebab-case",
				},
			],
			// The v22 migration pins components to Eager change detection to keep pre-v22 behavior.
			// Re-enable once components are migrated to OnPush.
			"@angular-eslint/prefer-on-push-component-change-detection": "off",
		},
	},
	{
		files: ["**/*.html"],
		extends: [
			...angular.configs.templateRecommended,
			...angular.configs.templateAccessibility,
		],
		rules: {},
	}
);
