﻿using DragonsCrossing.Domain.Common;
using DragonsCrossing.Domain.Heroes;
using DragonsCrossing.Domain.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DragonsCrossing.Domain.Players
{
    /// <summary>
    /// We'll store this in the DB just for logging/reference purposes, but the
    /// source of truth for which heroes belong to which players is Harmony. 
    /// </summary>
    public class Player : ChangeTracking
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        /// <summary>
        /// This is generated by the server every time the player logs in (similar to a session token)
        /// However, once the player is authenticated, this needs to be set to a random value
        /// TODO: May not be needed
        /// </summary>
        public Guid Nonce { get; set; }

        /// <summary>
        /// TODO: may not be needed
        /// </summary>
        public string SignedSignature { get; set; }

        /// <summary>
        /// Blockchain public address
        /// </summary>
        public string BlockchainPublicAddress { get; set; }

        /// <summary>
        /// This contains everything stored on the blockchain.
        /// The blockchain owns this data - at least the id's for each NFT Item.
        /// aka wallet, aka secured stash
        /// </summary>
        public PlayerBackpack Backpack { get; set; }

        /// <summary>
        /// These heroes are owned by the blockchain. We can cache them in our db but
        /// we need to refresh our db cache frequently in case the hero gets sold while
        /// the player is in the middle of playing the game.
        /// </summary>
        public List<Hero>? Heroes { get; set; }

        public PlayerGameSetting GameSetting { get; set; }
        
        public int GameSettingId { get; set; }

        public enum ChildIncludes
        {
            Backpack,
            GameSetting,
            Heroes,
            Heroes_CombatStats
        }
    }    
}
