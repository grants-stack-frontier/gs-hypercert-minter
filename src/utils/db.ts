import supabase from "./supabase";

export async function fetchTags() {
  const { data: options } = await supabase
    .from("tags")
    .select("tag_label, tag_value");

  // console.log(options)

  return options?.map((option) => ({
    label: option.tag_label as string,
    value: option.tag_value as string,
  }));
}

export async function fetchChapters() {
  const { data: chapters } = await supabase
    .from("chapters")
    .select("chapter_name, id, chapter_lead");

  return chapters?.map((chapter) => ({
    label: chapter.chapter_name as string,
    value: chapter.id as string,
  }));
}

export async function fetchMembers(chapter_id: string) {
  // find for particular chapter id only
  const { data: members } = await supabase
    .from("members")
    .select("member_name, wallet")
    .eq("chapter", chapter_id);

  //    console.log(members)

  return members?.map((member) => ({
    label: member.member_name as string,
    value: member.wallet as string,
  }));
}
