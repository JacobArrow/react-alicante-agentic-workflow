import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { getSpeakers } from "@/utils/speakers";
import { Flex, Grid, Text } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = getSpeakers(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      {/*
        Hardcoded, not next-intl: `getTranslations` reads request-scoped data
        that Cache Components refuses to prerender without `"use cache"` or
        `<Suspense>` (broke the Vercel build — see PR #4). No other page.tsx
        in this app uses `getTranslations` for the same reason; Stats and
        Schedule hardcode their headings too. Matching that instead of
        reintroducing the failure.
      */}
      <PageHeading title="Speakers">
        Every speaker at React Alicante, with the sessions they&apos;re giving.
      </PageHeading>

      {speakers.length === 0 ? (
        <Text color="var(--text-muted)">
          No speakers yet — check back closer to the day.
        </Text>
      ) : (
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
      )}
    </Flex>
  );
}
