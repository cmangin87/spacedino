INSERT INTO leaderboards (player, score)
VALUES
("MyNameIsJake", 35),
("KevinTheDude", 50),
("UkrainianKatya", 25);

SELECT 
    player, 
    score, 
    RANK() OVER (ORDER BY score DESC) score_rank
FROM 
    leaderboards;
    
SELECT * FROM leaderboards;

