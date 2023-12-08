import { fail, redirect } from '@sveltejs/kit';
import { freeFormSearch } from '@simple-nominatim/core'

export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    let result;
    try {
      result = await freeFormSearch({ query: formData.localization }, { format: 'jsonv2' });
    } catch (err) {
      return fail(400, {
        data: formData,
        errors: { localization: ["Unable to find a localization!"] }
      });

    }
    throw redirect(303, `/bargains?client_lat=${result[0].lat}&client_lon=${result[0].lon}&radius=${formData.radius}`);
  },
}
