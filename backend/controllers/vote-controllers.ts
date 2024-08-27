import { prisma } from "..";
import { Verify } from "../utils/utils";

export const CreateVote = async (req: any, res: any) => {
  try {
    const { timeslots, partyid } = await req.body;

    if (!timeslots || !partyid) {
      throw new Error("Please provide all required fields");
    }

    let token: string = "";
    let user;
    let decoded: any;
    let newVote;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    // get user from token
    if (token !== "") {
      decoded = await Verify(token);
      user = await prisma.user.findFirst({
        where: {
          id: decoded.id,
        },
      });
    }

    if (user && user.nickname) {
      const voteData = {
        creatorName: user.nickname,
        partyid: partyid,
        userId: user.id,
      };

      // find if user has already voted
      const oldVote = await prisma.votetime.findFirst({
        where: {
          partyid: partyid,
          userId: user.id,
        },
      });

      if (oldVote) {
        console.log("oldVote", oldVote);
        
        await prisma.timeSlot.deleteMany({
          where: { votetimeId: oldVote.id },
        });

        // update vote
        newVote = await prisma.votetime.update({
          where: {
            id: oldVote.id,
          },
          data: {
            ...voteData,
            timeslots: {
              create: timeslots.map((ts: any) => ({
                date: ts.date,
                start_time: ts.start_time,
                start_ampm: ts.start_ampm,
                end_time: ts.end_time,
                end_ampm: ts.end_ampm,
              })),
            },
          },
        });
      } else {
        // create vote
        newVote = await prisma.votetime.create({
          data: {
            ...voteData,
            timeslots: {
              create: timeslots.map((ts: any) => ({
                date: ts.date,
                start_time: ts.start_time,
                start_ampm: ts.start_ampm,
                end_time: ts.end_time,
                end_ampm: ts.end_ampm,
              })),
            },
          },
        });
      }

    } else {
      // todo: using creatorName to create vote
      throw new Error("User not found");
    }

    if (!newVote) throw new Error("Vote creation failed");

    res.status(200).json({ newVote });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const GetVoteTimes = async (req: any, res: any) => {
  try {
    const { partyid } = await req.query;

    if (!partyid) {
      throw new Error("Please provide all required fields");
    }

    const votes = await prisma.votetime.findMany({
      where: {
        partyid: partyid,
      },
      include: {
        timeslots: true,
      },
    });

    res.status(200).json(votes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
