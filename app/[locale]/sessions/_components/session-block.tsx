import { Badge } from "@/components/atoms/badge";
import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { formatSessionLevel } from "@/utils/session-level";
import { Box, Flex, Text, VisuallyHidden } from "@chakra-ui/react";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Flex align="start" gap="1">
            <Text
              fontWeight="medium"
              color="var(--text-primary)"
              truncate
              flex="1"
              minWidth="0"
            >
              {session.title}
            </Text>
            <Box flexShrink="0">
              <Badge variant="outline">
                <VisuallyHidden>Level: </VisuallyHidden>
                {formatSessionLevel(session.level)}
              </Badge>
            </Box>
          </Flex>
          <Text color="var(--text-muted)" truncate>
            {session.startTime} · {session.speaker}
          </Text>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
