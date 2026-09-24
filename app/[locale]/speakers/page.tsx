import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { getSpeakers } from "@/utils/speakers";
import { Flex, Grid } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

export default async function SpeakersPage() {
  const t = await getTranslations("SpeakersPage");
  const sessions = await fetchSessions();
  const speakers = getSpeakers(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>

      <Grid
        gap="4"
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </Grid>
    </Flex>
  );
}
