import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace(/\//g, "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  query = id
    ? query.update({ ...newCabin, image: imagePath }).eq("id", id)
    : query.insert([{ ...newCabin, image: imagePath }]);

  const { data, error } = await query
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) {
    return data;
  }

  const { error: storageError } = await supabase
    .storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins")
      .delete()
      .eq("id", data.id);

    throw new Error("Cabin image could not be uploaded and cabin was not created");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
};