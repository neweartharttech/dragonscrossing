﻿using DragonsCrossing.Core.Contracts.Api.Dto.Heroes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DragonsCrossing.Core.Contracts.Api.Dto.Items
{
    public class MoveItemRequestDto
    {
        [Required]
        public int FromIndex { get; set; }

        [Required]
        public int ToIndex { get; set; }
    }
}
