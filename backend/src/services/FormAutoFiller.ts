export class FormAutoFiller {
  detectFields(formHtml: string) {
    return {
      textFields: (formHtml.match(/<input/gi) || []).length,
      selects: (formHtml.match(/<select/gi) || []).length,
      textareas: (formHtml.match(/<textarea/gi) || []).length
    };
  }

  autoFill(formData: Record<string, string>, profileData: Record<string, string>) {
    return Object.fromEntries(Object.keys(formData).map((field) => [field, profileData[field] || formData[field] || '']));
  }
}
