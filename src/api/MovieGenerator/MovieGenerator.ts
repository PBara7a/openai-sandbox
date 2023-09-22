import { openai } from "../utils/OpenAi";
import { MovieCompletionPrompt, OpenAIImagePrompt } from "../../models/OpenAI";

const fetchMovieCompletion = async ({
  prompt,
  temperature,
  max_tokens,
}: MovieCompletionPrompt) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature,
      max_tokens,
    });
    return completion.choices[0]?.message.content ?? "";
  } catch (error: any) {
    console.error(
      "There was a problem with the fetch operation:",
      error?.message
    );
    throw error;
  }
};

const fetchImageFromOpenAI = async ({
  prompt,
  size = "512x512",
  format = "url",
  quantity = 1,
}: OpenAIImagePrompt) => {
  try {
    const response = await openai.images.generate({
      prompt,
      n: quantity,
      size,
      response_format: format,
    });
    return response.data[0]?.url ?? "";
  } catch (error: any) {
    console.error(
      "There was a problem with the fetch operation:",
      error?.message
    );
    throw error;
  }
};

export const getBotFirstImpression = async (idea: string) => {
  const prompt = `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
  ###
  outline: Two dogs fall in love and move to Hawaii to learn to surf.
  message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
  ###
  outline: A plane crashes in the jungle and the passengers have to walk 1000km to safety.
  message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
  ###
  outline: A group of corrupt lawyers try to send an innocent woman to jail.
  message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
  ###
  outline: ${idea}
  message: 
  `;
  return fetchMovieCompletion({ prompt, max_tokens: 60 });
};

export const getSynopsis = async (idea: string) => {
  const prompt = `Generate an engaging, professional and marketable movie synopsis based on the following idea: ${idea}. Just give the synopsis without a title. The synopsis should include actors names in parentheses after each character. Choose actors that would be ideal for this role.`;
  return fetchMovieCompletion({ prompt });
};

export const getTitle = async (synopsis: string) => {
  const prompt = `Generate a short and catchy title for this synopsis: ${synopsis}`;
  return fetchMovieCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: 25,
  });
};

export const getFeaturingActors = async (synopsis: string) => {
  const prompt = `Extract the names in parentheses from the synopsis.
  ###
  synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
  names: Tom Cruise, Val Kilmer, Kelly McGillis
  ###
  synopsis: ${synopsis}
  names:   
  `;
  return fetchMovieCompletion({ prompt });
};

export const getImagePrompt = async (title: string, synopsis: string) => {
  const prompt = `Give a short description of an image which could be used to advertise a movie based on a title and synopsis. The description should be rich in visual detail but contain no names.
  ###
  title: Love's Time Warp
  synopsis: When scientist and time traveller Wendy (Emma Watson) is sent back to the 1920s to assassinate a future dictator, she never expected to fall in love with them. As Wendy infiltrates the dictator's inner circle, she soon finds herself torn between her mission and her growing feelings for the leader (Brie Larson). With the help of a mysterious stranger from the future (Josh Brolin), Wendy must decide whether to carry out her mission or follow her heart. But the choices she makes in the 1920s will have far-reaching consequences that reverberate through the ages.
  image description: A silhouetted figure stands in the shadows of a 1920s speakeasy, her face turned away from the camera. In the background, two people are dancing in the dim light, one wearing a flapper-style dress and the other wearing a dapper suit. A semi-transparent image of war is super-imposed over the scene.
  ###
  title: zero Earth
  synopsis: When bodyguard Kob (Daniel Radcliffe) is recruited by the United Nations to save planet Earth from the sinister Simm (John Malkovich), an alien lord with a plan to take over the world, he reluctantly accepts the challenge. With the help of his loyal sidekick, a brave and resourceful hamster named Gizmo (Gaten Matarazzo), Kob embarks on a perilous mission to destroy Simm. Along the way, he discovers a newfound courage and strength as he battles Simm's merciless forces. With the fate of the world in his hands, Kob must find a way to defeat the alien lord and save the planet.
  image description: A tired and bloodied bodyguard and hamster standing atop a tall skyscraper, looking out over a vibrant cityscape, with a rainbow in the sky above them.
  ###
  title: ${title}
  synopsis: ${synopsis}
  image description: 
  `;
  return fetchMovieCompletion({
    prompt,
    temperature: 0.8,
    max_tokens: 100,
  });
};

export const getMoviePoster = async (prompt: string) => {
  return fetchImageFromOpenAI({ prompt });
};

export const getMovieIdea = async (prompt: string) => {
  const synopsis = await getSynopsis(prompt);
  const title = await getTitle(synopsis);
  const actors = await getFeaturingActors(synopsis);
  const imagePrompt = await getImagePrompt(title, synopsis);
  const imageUrl = await getMoviePoster(imagePrompt);
  return {
    title,
    synopsis,
    actors,
    poster: imageUrl,
  };
};
