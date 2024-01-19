/**
 * The name of the lineHeight plugin.
 */
export const LINE_HEIGHT = 'lineHeight';
function getOptionDefinition(option) {
    // Check whether passed option is a full item definition provided by user in configuration.
    if (typeof option === 'object' && isFullItemDefinition(option))
        return option;
    // 'Default' lineHeight. It will be used to remove the lineHeight attribute.
    if (option === 'default') {
        return {
            model: undefined,
            title: 'Default',
        };
    }
    return generatePreset(option);
}
function generatePreset(definition) {
    if (typeof definition !== 'object') {
        definition = {
            title: String(definition),
            model: String(definition),
        };
    }
    return {
        title: definition.title,
        model: definition.model,
    };
}
export function normalizeOptions(configuredOptions) {
    return configuredOptions
        .map(item => getOptionDefinition(item))
        .filter(option => !!option);
}
export function buildDefinition(modelAttributeKey, options) {
    const definition = {
        model: {
            key: modelAttributeKey,
            values: [],
        },
        view: {},
    };
    for (const option of options) {
        definition.model.values.push(option.model);
        definition.view[option.model] = {
            key: 'style',
            value: {
                'line-height': option.model,
            },
        };
    }
    return definition;
}
/**
 * We treat `definition` as completed if it is an object that contains `title`, `model` and `view` values.
 */
function isFullItemDefinition(definition) {
    return definition.title && definition.model && definition.view;
}
