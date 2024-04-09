import validatePackageName from "validate-npm-package-name";

export const assertValidPackageName = (name: string) => {
	const { validForOldPackages, validForNewPackages, warnings, errors } = validatePackageName(name);
	const isValid = validForOldPackages || validForNewPackages;
	if (!isValid) {
		throw new Error("invalid package name", { cause: { name, warnings, errors } });
	}
};
