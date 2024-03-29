﻿using Amazon.CDK;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Project
{
    sealed class Program
    {
        public static void Main(string[] args)
        {
            var app = new App();
            Amazon.CDK.Environment env = new Amazon.CDK.Environment();
            env.Account = System.Environment.GetEnvironmentVariable("CDK_DEFAULT_ACCOUNT");
            env.Region = System.Environment.GetEnvironmentVariable("CDK_DEFAULT_REGION");
             
            
            new ProjectStack(app, "ProjectStack", new StackProps{Env = env});

            try {
                new FrontendStack(app, "FrontendStack");
            } catch(System.Exception e) {
                // Ignore. Throws if you don't have the Frontend build folder
                Console.WriteLine(e.Message);
            }
            
            app.Synth();
        }
    }
}
