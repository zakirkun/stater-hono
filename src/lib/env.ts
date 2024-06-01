import {z, TypeOf} from 'zod'

const zodEnv = z.object({
    DB_HOST: z.string(),
	DB_USER: z.string(),
	DB_PASS: z.string().nullable(),
	DB_NAME: z.string(),
	DB_PORT: z.number()
})

declare global {
    namespace NodeJs {
        interface ProcessEnv extends TypeOf<typeof zodEnv>{}
    }
}

try {
	
    zodEnv.parse(process.env.DB_HOST)
	zodEnv.parse(process.env.DB_USER)
	zodEnv.parse(process.env.DB_PASS)
	zodEnv.parse(process.env.DB_NAME)
	zodEnv.parse(process.env.DB_PORT)

} catch (err) {
    if (err instanceof z.ZodError) {
		const { fieldErrors } = err.flatten();
		const errorMessage = Object.entries(fieldErrors)
			.map(([field, errors]) =>
				errors ? `${field}: ${errors.join(", ")}` : field,
			)
			.join("\n  ");
		throw new Error(`Missing environment variables:\n  ${errorMessage}`);
	}
}