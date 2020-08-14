# Calculating storage requirements

Regardless of the datastore chosen, the content will take up space. The actual number can be hard
to calculate due to fluctations in usage patterns and a number of unknowns, however this section
should give some general guidance on where to start planning.

The first thing to determine is the kind of media most users on your server will be uploading and/or
consuming. Screenshots tend to be in the 500kb - 1mb range while photos tend to be 4-12mb. Avatars
for users tend to be either photos or highly cropped images under 1mb in size.

Once the kind of media is determined, the next step is to figure out a frequency: most communities
will be surrounded by sharing some photos in a week and many screenshots a day. Taking the frequency
and multiplying it by the average anticipated file size from the previous step will result in an
optimistic number for storage requirements. Multiplying that number by two will get a pessimistic
estimate.

A typical user will encounter 10-20mb worth of new media each day. Assuming most of this can be
de-duplicated or cached, the following estimations can be made:

|Monthly active users|Raw storage per month|De-duplicated storage per month|
|--------------------|---------------------|-------------------------------|
| <500               | 150 - 300 GB        | 60 - 120 GB                   |
| 2000               | 600 - 1200 GB       | 240 - 480 GB                  |
| 5000               | 1.5 - 3 TB          | 0.6 - 1.2 TB                  |
| 10,000              | 3 - 6 TB            | 1.2 - 2.4 TB                  |
| 120,000             | 36 - 72 TB          | 14.4 - 28.8 TB                |

**Note**: Exact growth is something you'll have to monitor for and manage. This is provided as a guide
only for the purposes of getting started with the media repo.
